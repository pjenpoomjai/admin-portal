gitlab-ci-testing:
	echo "Gitlab CI Testing Triggered PROFILE: $(GITLAB_CI_TEST_PROFILE) API Endpoint: $(API_ENDPOINT)"
	curl $(API_ENDPOINT)/template
alpha-testing:
	echo "Alpha Testing Triggered"
staging-testing:
	echo "Staging Testing Triggered"
pt-testing:
	echo "PT Testing Triggered"
preprod-testing:
	echo "Preprod Testing Triggered"
