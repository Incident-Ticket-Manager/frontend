pipeline {
    environment {
    imageName = 'thomaslacaze/itm-frontend'
    registryCredential = 'dockerCredential'
    }

    agent any
    stages {

      stage('Clone repository') {
          checkout scm
      }

      stage('Build image') {
          app = docker.build("${env.imageName}")
      }

      stage('Push image') {
          docker.withRegistry('https://registry.hub.docker.com', 'registryCredential') {
              app.push("${env.BUILD_NUMBER}")
              app.push("latest")
          }
      }
    }
}