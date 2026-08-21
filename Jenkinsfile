pipeline {

    agent any

    options {
        // We will checkout manually after cleaning the workspace
        skipDefaultCheckout(true)

        timestamps()
        disableConcurrentBuilds()

        timeout(time: 90, unit: 'MINUTES')

        buildDiscarder(
            logRotator(
                numToKeepStr: '20',
                artifactNumToKeepStr: '10'
            )
        )
    }

    environment {
        COMPOSE_FILE = 'opencart/docker-compose.yml'
    }

    /*
    // Enable this AFTER the manual pipeline runs successfully.
    // Jenkins timezone must be configured correctly for Vietnam time.
    triggers {
        cron('0 23 * * *')
    }
    */

    stages {

        // ============================================================
        // 1. Clean workspace and checkout latest source code
        // ============================================================
        stage('Checkout') {
            steps {
                deleteDir()
                checkout scm
            }
        }

        // ============================================================
        // 2. Verify Jenkins environment
        // ============================================================
        stage('Environment Check') {
            steps {
                bat '''
                    echo ===== Environment =====

                    node --version
                    npm --version
                    git --version
                    docker --version
                    docker compose version
                '''
            }
        }

        // ============================================================
        // 3. Verify Docker daemon is available
        // ============================================================
        stage('Docker Health Check') {
            steps {
                bat '''
                    docker info > nul 2>&1

                    if errorlevel 1 (
                        echo Docker daemon is not available.
                        exit /b 1
                    )

                    echo Docker daemon is ready.
                '''
            }
        }

        // ============================================================
        // 4. Install Node dependencies
        // ============================================================
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        // ============================================================
        // 5. Install Playwright browser
        // ============================================================
        stage('Install Playwright Browser') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        // ============================================================
        // 6. Remove previous Docker environment
        // ============================================================
        stage('Reset Test Environment') {
            steps {
                bat '''
                    echo Resetting previous Docker environment...

                    docker compose -f %COMPOSE_FILE% down -v
                '''
            }
        }

        // ============================================================
        // 7. Prepare OpenCart runtime files
        // ============================================================
        stage('Prepare OpenCart') {
            steps {
                bat '''
                    echo Preparing OpenCart configuration...

                    copy /Y ^
                    opencart\\upload\\config-dist.php ^
                    opencart\\upload\\config.php

                    copy /Y ^
                    opencart\\upload\\admin\\config-dist.php ^
                    opencart\\upload\\admin\\config.php

                    if exist opencart\\upload\\install.lock (
                        echo Removing old install.lock...
                        del /F /Q opencart\\upload\\install.lock
                    )
                '''
            }
        }

        // ============================================================
        // 8. Build and start OpenCart environment
        // ============================================================
        stage('Start OpenCart') {
            steps {
                bat '''
                    echo Starting OpenCart environment...

                    docker compose -f %COMPOSE_FILE% up -d --build

                    echo.
                    echo ===== Container Status =====

                    docker compose -f %COMPOSE_FILE% ps -a
                '''
            }
        }

        // ============================================================
        // 9. Wait until OpenCart responds
        // ============================================================
        stage('Wait for OpenCart') {

            options {
                timeout(time: 3, unit: 'MINUTES')
            }

            steps {
                bat '''
                    echo Waiting for OpenCart...

                    :wait_for_opencart

                    curl --silent --fail http://localhost/ > nul

                    if errorlevel 1 (
                        echo OpenCart is not ready yet...

                        powershell -NoProfile -Command ^
                        "Start-Sleep -Seconds 5"

                        goto wait_for_opencart
                    )

                    echo OpenCart is ready!
                '''
            }
        }

        // ============================================================
        // 10. Verify OpenCart database installation
        // ============================================================
        stage('Verify OpenCart Schema') {
            steps {
                bat '''
                    echo Verifying OpenCart database...

                    docker compose -f %COMPOSE_FILE% exec -T mysql ^
                    mysql -uroot -popencart opencart ^
                    -e "SELECT 1 FROM oc_customer LIMIT 1"

                    echo OpenCart database is ready.
                '''
            }
        }

        // ============================================================
        // 11. Seed deterministic test user
        // ============================================================
        stage('Seed Test User') {
            steps {
                bat '''
                    echo Seeding test user...

                    docker compose -f %COMPOSE_FILE% cp ^
                    opencart/seed-test-user.php ^
                    opencart:/tmp/seed-test-user.php

                    docker compose -f %COMPOSE_FILE% exec -T opencart ^
                    php /tmp/seed-test-user.php
                '''
            }
        }

        // ============================================================
        // 12. Run nightly regression suite only
        // ============================================================
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

        // ============================================================
        // Always keep reports
        // ============================================================
        always {

            echo 'Archiving test artifacts...'

            archiveArtifacts(
                artifacts: 'playwright-report/**,test-results/**,allure-results/**',
                allowEmptyArchive: true
            )
        }

        // ============================================================
        // Cleanup when successful
        // ============================================================
        success {

            echo 'Regression PASSED.'

            bat '''
                echo Cleaning Docker environment...

                docker compose -f %COMPOSE_FILE% down -v
            '''
        }

        // ============================================================
        // Keep containers when failed for debugging
        // ============================================================
        failure {

            echo 'Pipeline FAILED. Keeping containers for debugging.'

            bat '''
                echo.
                echo ===== Container Status =====
                docker compose -f %COMPOSE_FILE% ps -a

                echo.
                echo ===== OpenCart Logs =====
                docker compose -f %COMPOSE_FILE% logs --tail=150 opencart
            '''
        }
    }
}