pipeline {
  environment {
  imageName = 'thomaslacaze/itm-frontend'
  registryCredential = 'dockerCredential'
  }

  agent any
  stages {

    stages {
        stage('Display env') {
            steps {
                sh 'printenv'
            }
        }
    }

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
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }
  }
}
