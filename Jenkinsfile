pipeline {
    agent any

    stages {
        stage('checkout') {
            steps {
                git url: 'https://github.com/amareshmaity/health-App.git', 
                branch: 'main'
            }
        }

        stage('Build') {
            steps {
                bat 'docker-compose build --no-cache'
            }
        }

        stage('Tag Image') {
            steps {
                bat 'docker tag health-app amareshmaity/health-app:latest'
            }
        }

        stage('Push Image') {
            steps {
                bat 'docker login -u amareshmaity -p aS!PnJ7MDfCgxe9'
                bat 'docker push amareshmaity/health-app:latest'
            }
        }

        stage('Deploy') {
            steps {
                bat """
                docker stop health-app || true
                docker rm health-app || true
                docker rmi amareshmaity/health-app:latest || true
                docker pull amareshmaity/health-app:latest
                docker run --name health-app -p 3000:3000 amareshmaity/health-app:latest
                """
            }
        }
    }
}
