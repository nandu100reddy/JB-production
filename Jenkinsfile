pipeline {
     agent any
     stages {
        stage("Build") {
            steps {
                sh "npm install"
                sh "npm run build"
            }
        }
          
          
        stage("Deploy") {
            steps {
                sh "rm -rf /var/www/jbpfrontend/"
                sh "cp -r ${WORKSPACE}/build/ /var/www/jbpfrontend/"
            } 
        }
    }
}
