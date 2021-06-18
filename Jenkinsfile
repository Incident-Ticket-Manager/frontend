pipeline {
  environment {
  imageName = 'thomaslacaze/itm-frontend'
  registryCredential = 'dockerCredential'
  }

  agent any
  stages {
    stage('Display env') {
        steps {
            sh 'printenv'
        }
    }

    stage('Build & Deploy Image') {
      when {
        tag '*'
      }
      steps {
          script {
            version = GIT_TAG
            versions = version.split('\\.')
            major = 'v'+versions[0]
            minor = 'v'+versions[0] + '.' + versions[1]
            patch = 'v'+version.trim()
            docker.withRegistry('', 'registryCredential') {
                image = docker.build imageName:latest
                image.push()
                image.push(major)
                image.push(minor)
                image.push(patch)
            }
          }
      }
    }
  }
}
