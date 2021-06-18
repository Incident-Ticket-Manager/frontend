pipeline {
  environment {
  imageName = 'thomaslacaze/itm-frontend'
  registryCredential = 'dockerCredential'
  }

  agent any
  stages {

    stage('Building image') {
      steps {
        script {
          dockerImage = docker.build imageName + ":$BUILD_NUMBER"
        }
      }
    }
    stage('Deploy Image') {
      steps {
        script {
          docker.withRegistry( '', $registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps {
        sh "docker rmi $imageName:$BUILD_NUMBER"
      }
    }
  }
}
