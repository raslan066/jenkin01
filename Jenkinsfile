
node() {

    try{
    stage('cloning')
    // some block
    git 'https://github.com/raslan066/jenkin01.git'



    stage('runnig test')
    sh label: '', script: '''npm install
    npm test'''

    step([$class: 'JUnitResultArchiver', testResults: 'test-results.xml'])

    notify('success')

    // archiveArtifacts artifacts: 'calc pipeline', followSymlinks: false
} catch(err) {
    stage('send Error')
    notify(err)
}
}

def notify(status){
    emailext body: "${status}", subject: 'JenkinTest', to: 'resul.aslan@acxiom.com'
}

stage('TBD')




