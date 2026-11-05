name: Bug Report
description: Report a bug to help us improve
labels: ["bug"]
body:
  - type: markdown
    attributes:
      value: "## Bug Report"
  
  - type: textarea
    id: description
    attributes:
      label: "Description"
      description: "Clear description of the bug"
      placeholder: "What is the bug?"
    validations:
      required: true
  
  - type: textarea
    id: steps
    attributes:
      label: "Steps to Reproduce"
      description: "How to reproduce the bug"
      placeholder: |
        1. Step 1
        2. Step 2
        3. Step 3
    validations:
      required: true
  
  - type: textarea
    id: expected
    attributes:
      label: "Expected Behavior"
      description: "What should happen"
      placeholder: "The expected result..."
    validations:
      required: true
  
  - type: textarea
    id: actual
    attributes:
      label: "Actual Behavior"
      description: "What actually happens"
      placeholder: "The actual result..."
    validations:
      required: true
  
  - type: input
    id: environment
    attributes:
      label: "Environment"
      description: "OS, browser version, etc."
      placeholder: "e.g., macOS 14.0, Node 20, Chrome 120"
    validations:
      required: false
  
  - type: textarea
    id: additional
    attributes:
      label: "Additional Context"
      description: "Any other information"
    validations:
      required: false
