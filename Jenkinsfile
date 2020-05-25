pipeline {

    options {
      ansiColor('xterm')
      buildDiscarder(logRotator(numToKeepStr:'10'))
        disableConcurrentBuilds()
    }
    agent {
            label 'rebuild06'
        }
//     environment {
//     TEST_EXEC_ID  : "TrialV1"
//
//     }

    stages {

    // -- Source Code Work
            stage('SCM') {
                steps {

                    echo """
                    ╭─━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━─╮
                      Clean & Check Source Code Out
                    ╰─━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━─╯
                    """
                    //-- CleanUP
                    step([$class: 'WsCleanup'])
                    script {

                       def scmVars = checkout scm
                       env.GIT_BRANCH = scmVars.GIT_BRANCH

                    }


                    echo """
                    ╭─━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━─╮
                      GET GIT Changelog
                    ╰─━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━─╯
                    """
                    script {

                        def changeString = ""
                        echo "Gathering SCM changes"

                        def changeLogSets = currentBuild.rawBuild.changeSets
                        for (int i = 0; i < changeLogSets.size(); i++) {
                            def entries = changeLogSets[i].items
                            for (int j = 0; j < entries.length; j++) {
                                def entry = entries[j]
                                truncated_msg = ""+entry.msg+"<br>"
                                changeString += "   - ${truncated_msg} [${entry.author}]<br><br>"
                            }
                        }
                        try {
                            env.CHANGELOG = changeString + " "
                        } catch (Exception e) {
                            echo "no"
                        }

                    }


                }
            }


    }

}
