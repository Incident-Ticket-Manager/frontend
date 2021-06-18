pipeline {
  environment {
    imageName = 'thomaslacaze/itm-frontend'
    registryCredential = 'dockerhub'
  }
  agent any  stages {
    stage('Building image') {
      steps{
        script {
          docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
  }
}