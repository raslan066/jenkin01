pipeline {

// environment {
//
// echo """
//                 ╭─━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━─╮
//                  Environment Constants
//                 ╰─━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━─╯
//                 """
//
//     }


    // -- Discard old build [max to keep is 10]
    // -----------------------------------------
    options {

      buildDiscarder(logRotator(numToKeepStr:'10'))
      disableConcurrentBuilds()
    }

    // -- Defines the agent we are going to build on [master then children].
    // -----------------------------------------
//     agent {
//         label ''
//     }

    // -- Begin execution of our pipeline break our process into steps that are logical
    // -----------------------------------------
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

        def VERSION = "1.1.1"
        // - Versioning
        // ------------------------------------------
        stage('VersionStamp') {
            steps {


                echo """
                ╭─━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━─╮
                  Set Version Number of SCM State
                ╰─━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━─╯
                """

                // -- Set Version number in Jenkins
                script {

                    currentBuild.displayName = "${VERSION}"
                    currentBuild.description = "${VERSION}"

                }

            }
        }
        stage('VersionStamp') {
                    steps {
                    def VERSION = "1.1.1"

                        echo """
                        ╭─━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━─╮
                          Set Version Number of SCM State
                        ╰─━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━─╯
                        """

                        // -- Set Version number in Jenkins
                        sh '''npm install
                        npm test'''

                    }
                }
    }

 }
