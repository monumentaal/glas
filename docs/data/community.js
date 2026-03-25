name: TEST WRITE

on:
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest

    permissions:
      contents: write

    steps:
      - uses: actions/checkout@v4

      - run: echo "// test $(date)" >> docs/data/community.js

      - run: |
          git config user.name "github-actions"
          git config user.email "actions@github.com"
          git add docs/data/community.js
          git commit -m "test" || echo "no change"
          git push
