pipeline {
    agent {
        node {
            label 'opencart-playwright-agent'
            customWorkspace 'D:\\JenkinsWorkspace\\opencart-playwright-nightly'
        }
    }

    options {
        skipDefaultCheckout(true)
        timestamps()
        disableConcurrentBuilds()
        timeout(time: 90, unit: 'MINUTES')
    }

    environment {
        COMPOSE_FILE = 'opencart/docker-compose.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                deleteDir()
                checkout scm
            }
        }

        stage('Environment Check') {
            steps {
                bat '''
                    node --version
                    npm --version
                    git --version
                    docker --version
                    docker compose version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browser') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Reset Environment') {
            steps {
                bat '''
                    docker compose -f %COMPOSE_FILE% down -v

                    if exist opencart\\upload\\install.lock (
                        del /F /Q opencart\\upload\\install.lock
                    )
                '''
            }
        }

        stage('Start OpenCart') {
            steps {
                bat '''
                    docker compose -f %COMPOSE_FILE% up -d --build
                    docker compose -f %COMPOSE_FILE% ps -a
                '''
            }
        }

        stage('Wait for OpenCart') {
            options {
                timeout(time: 3, unit: 'MINUTES')
            }

            steps {
                bat '''
                    :wait

                    curl --silent --fail http://localhost/ > nul

                    if errorlevel 1 (
                        echo OpenCart is not ready yet...
                        docker compose -f %COMPOSE_FILE% ps -a
                        powershell -NoProfile -Command "Start-Sleep -Seconds 5"
                        goto wait
                    )

                    echo OpenCart is ready!
                '''
            }
        }

        stage('Verify Schema') {
            steps {
                bat '''
                    docker compose -f %COMPOSE_FILE% exec -T mysql ^
                    mysql -uroot -popencart opencart ^
                    -e "SELECT 1 FROM oc_customer LIMIT 1"
                '''
            }
        }

        stage('Seed Test User') {
            steps {
                bat '''
                    docker compose -f %COMPOSE_FILE% cp ^
                    opencart/seed-test-user.php ^
                    opencart:/tmp/seed-test-user.php

                    docker compose -f %COMPOSE_FILE% exec -T opencart ^
                    php /tmp/seed-test-user.php
                '''
            }
        }

        stage('Regression Tests') {
            steps {
                bat 'set CI=true&& npm run test:regression'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts:
                'playwright-report/**,test-results/**,allure-results/**',
                allowEmptyArchive: true
        }

        success {
            bat 'docker compose -f %COMPOSE_FILE% down -v'
        }

        failure {
            bat '''
                docker compose -f %COMPOSE_FILE% ps -a
                docker compose -f %COMPOSE_FILE% logs --tail=150 opencart
            '''
        }
    }
}