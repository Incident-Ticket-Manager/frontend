pipeline {
    environment {
    imageName = 'thomaslacaze/itm-frontend'
    registryCredential = 'dockerCredential'
    }

    agent any
    stages {

      stage('Clone repository') {
        steps{
          checkout scm
        }
      }

      stage('Build image') {
        steps{
          app = docker.build("${env.imageName}")
        }
      }

      stage('Push image') {
        steps{
          docker.withRegistry('https://registry.hub.docker.com', 'registryCredential') {
              app.push("${env.BUILD_NUMBER}")
              app.push("latest")
          }
        }
      }
    }
}