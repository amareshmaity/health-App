pipeline {
    agent any

    environment{
        SSH_KEY_PATH='D:\\healthapp1.pem'
        SSH_USER='ec2-user'
        SSH_HOST='51.20.1.118'
    }

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
                ssh -i ${SSH_KEY_PATH} -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} ^ 
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
