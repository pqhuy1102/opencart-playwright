pipeline {

    agent any

    options {
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

        stage('Wait for Docker') {
            steps {
                bat '''
                    :wait

                    docker info > nul 2>&1

                    if errorlevel 1 (
                        echo Waiting for Docker daemon...
                        timeout /t 5 /nobreak > nul
                        goto wait
                    )

                    echo Docker daemon is ready!
                '''
            }
        }

        stage('Reset Test Environment') {
            steps {
                bat '''
                    docker compose -f %COMPOSE_FILE% down -v

                    if exist opencart\\upload\\install.lock (
                        del /f /q opencart\\upload\\install.lock
                    )
                '''
            }
        }

        stage('Start OpenCart') {
            steps {
                bat '''
                    docker compose -f %COMPOSE_FILE% up -d --build
                '''
            }
        }

        stage('Wait for OpenCart') {
            steps {
                bat '''
                    :wait

                    curl --silent --fail http://localhost/ > nul

                    if errorlevel 1 (
                        echo OpenCart is not ready...
                        timeout /t 5 /nobreak > nul
                        goto wait
                    )

                    echo OpenCart is ready!
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

        stage('Playwright Regression') {
            steps {
                bat '''
                    set CI=true
                    npm run test:regression
                '''
            }
        }
    }

    post {

        always {

            archiveArtifacts artifacts:
                'playwright-report/**,test-results/**,allure-results/**',
                allowEmptyArchive: true

            bat '''
                docker compose -f %COMPOSE_FILE% down -v
            '''
        }

        success {
            echo 'Nightly regression PASSED'
        }

        failure {
            echo 'Nightly regression FAILED'
        }
    }
}