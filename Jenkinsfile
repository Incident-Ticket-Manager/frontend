pipeline {
  environment {
    imageName = 'thomaslacaze/itm-frontend'
    registryCredential = 'dockerCredential'
    awsCredential = 'awsCredential'
    awsRegion = 'AWS_DEFAULT_REGION'
    bucketName = 'itm-frontend'
  }

  agent any
  stages {

    stage('Display env') {
      steps {
        sh 'printenv'
      }
    }

    stage('Build & Deploy Image release') {
      when {
        tag '*'
      }
      steps {
        script {
          version = TAG_NAME
          versions = version.split('\\.')
          major = versions[0]
          minor = versions[0] + '.' + versions[1]
          patch = version.trim()
          docker.withRegistry('', registryCredential) {
            image = docker.build imageName+":latest"
            image.push()
            image.push(major)
            image.push(minor)
            image.push(patch)
          }
        }
      }
    }

    stage('Build & Deploy Image Dev') {
      when {
        branch 'develop'
      }
      steps {
        script {
          docker.withRegistry('', registryCredential) {
            image = docker.build imageName+":develop"
            image.push()
          }
        }
      }
    }

    stage('Build Project & deploy to AWS S3 Bucket'){
      agent {
        dockerfile {
          filename 'Dockerfile'
        }
      }
      steps {
        script {
          sh 'ls /usr/share/nginx/html'
          withAWS(region: 'eu-west-1', credentials: awsCredential) {
            s3Delete(bucket: bucketName, path:'**/*')
            dir('/usr/share/') {
              sh 'ls /usr/share/nginx/html'
              s3Upload(bucket: bucketName, file: 'html/', workingDir:'nginx')
            }
          }
        }
      }
    }
  }
}

