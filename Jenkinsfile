pipeline {

environment {

        // -- Environment definitions
        HARNESS_COMPONENT                 = "test-executor"
        HARNESS_MAJOR_VERSION             = sh(returnStdout: true, script: "jq -r .version package.json | awk -F - '{print \$1}'").trim()
        HARNESS_VERSION_NUMERICAL_ONLY    = "${env.HARNESS_MAJOR_VERSION}.${BUILD_ID}"
        HARNESS_VERSION                    = "${env.HARNESS_VERSION_NUMERICAL_ONLY}.${GIT_HASH}"

        DESCRIPTION               = sh(script: "jq -r .description package.json", returnStdout: true).trim()

        GIT_HASH                  = sh(returnStdout: true, script: "git rev-parse --short HEAD | cut -c 1-6").trim()
        PHASE                     = "accept"
        REPONAME                  = determineRepoName().trim()
        REPO_URI                  = "${AWS_ACCOUNT_ID}.dkr.ecr.${env.REGION}.amazonaws.com/udl/${env.REPONAME}"
        CHANGELOG                 = "Changes: "
        TEST_UNIT_MAXSKIPPED      = "0"
        TEST_UNIT_MAXFAILED       = "1"
        UID                       = "${COMPONENT}-${VERSION}-${TARGET_ENVIRONMENT}"
        ENV                       = "${TARGET_ENVIRONMENT}"

    }


    // -- Discard old build [max to keep is 10]
    // -----------------------------------------
    options {

      buildDiscarder(logRotator(numToKeepStr:'10'))
        disableConcurrentBuilds()
    }

    // -- Defines the agent we are going to build on [master then children].
    // -----------------------------------------
    agent {
        label ''
    }

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

                    currentBuild.displayName = "${env.VERSION}"
                    currentBuild.description = "${env.VERSION}"

                }

            }
        }
    }

 }
