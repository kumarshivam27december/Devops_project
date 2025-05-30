// pipeline {
//     agent any

//     environment {
//         MONGO_URI = 'mongodb+srv://admin:devops@dev1.jbvy2go.mongodb.net/bookstagram?retryWrites=true&w=majority&appName=dev1'
//         SECRET='7801517b20bca347b28d3d1378d88f0f21f976a166a253b915aa3508eec3e3e470793455082d8ce2dc1e1dee8067f79c08919db603e248f5a23480d2f9f58311c731832d203bad2051a6f9b46aae1b699632ed33b86d7aa6e961a4824a5938a4dd9e60f05c0e7566187a33bf4ff5f0b270c54e5317d449d027885a84eae2cfb5a0f8f55bba604bed8e2e0456d5b3eda2aea24c92a1a6172481ee5e4369fb903f4fd00322e3c932b76824a1f60c0accd9a0c89583497add0013ddd9821a81abe450c4ca51c477147743c1d72c15eea6c4b0126dc3da2c3ac8c9b5186b99eb7fb2f0c2c0a31dbc957385ca37e8dac0be9db500484ffb78dfaff35f265944d21532'
//     }

//     stages {
//         stage('Clone Repo') {
//             steps {
//                 git 'https://github.com/kumarshivam27december/Devops_project.git'
//             }
//         }

//         stage('Build Docker Images') {
//             steps {
//                 sh 'docker-compose build'
//             }
//         }

//         stage('Run Containers') {
//             steps {
//                 sh 'docker-compose up -d'
//             }
//         }

//         stage('Show Running Containers') {
//             steps {
//                 sh 'docker ps'
//             }
//         }
//     }

//     post {
//         always {
//             echo 'Tearing down containers...'
//             sh 'docker-compose down'
//         }
//     }
// }
pipeline {
    agent any

    environment {
        MONGO_URI = 'mongodb+srv://admin:devops@dev1.jbvy2go.mongodb.net/bookstagram?retryWrites=true&w=majority&appName=dev1'
        SECRET = '7801517b20bca347b28d3d1378d88f0f21f976a166a253b915aa3508eec3e3e470793455082d8ce2dc1e1dee8067f79c08919db603e248f5a23480d2f9f58311c731832d203bad2051a6f9b46aae1b699632ed33b86d7aa6e961a4824a5938a4dd9e60f05c0e7566187a33bf4ff5f0b270c54e5317d449d027885a84eae2cfb5a0f8f55bba604bed8e2e0456d5b3eda2aea24c92a1a6172481ee5e4369fb903f4fd00322e3c932b76824a1f60c0accd9a0c89583497add0013ddd9821a81abe450c4ca51c477147743c1d72c15eea6c4b0126dc3da2c3ac8c9b5186b99eb7fb2f0c2c0a31dbc957385ca37e8dac0be9db500484ffb78dfaff35f265944d21532'
    }

    stages {
        
        stage('Clone Code') {
            steps {
                git 'https://github.com/kumarshivam27december/Devops_project.git'
            }
        }

        stage('Build Containers') {
            steps {
                sh 'docker-compose down || true' 
                sh 'docker-compose build'
            }
        }

        stage('Start App') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Check Containers') {
            steps {
                sh 'docker ps'
                sleep(time: 10, unit: 'SECONDS') 
                sh 'curl -I http://localhost:4000 || true' 
            }
        }
    }

    post {
        failure {
            echo 'Cleaning up failed deployment...'
            sh 'docker-compose down'
        }
    }
}