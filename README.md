# redcarpet

### Steps for Running test in Docker

  ## First of All Build the Docker
  docker build -t test_redcarpet .

  ## Run Test
  docker run -e CI=true test_redcarpet npm run test
