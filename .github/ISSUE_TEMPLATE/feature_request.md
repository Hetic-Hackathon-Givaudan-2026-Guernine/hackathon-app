name: Feature Request
description: Suggest a new feature
labels: ["enhancement"]
body:
  - type: markdown
    attributes:
      value: "## Feature Request"
  
  - type: textarea
    id: description
    attributes:
      label: "Description"
      description: "Clear description of the feature"
      placeholder: "What feature would you like to see?"
    validations:
      required: true
  
  - type: textarea
    id: problem
    attributes:
      label: "Problem Statement"
      description: "What problem does this solve?"
      placeholder: "The problem this feature addresses..."
    validations:
      required: true
  
  - type: textarea
    id: solution
    attributes:
      label: "Proposed Solution"
      description: "How should this be implemented?"
      placeholder: "Your idea for the solution..."
    validations:
      required: false
  
  - type: textarea
    id: alternatives
    attributes:
      label: "Alternative Solutions"
      description: "Other approaches considered"
    validations:
      required: false
  
  - type: textarea
    id: context
    attributes:
      label: "Additional Context"
      description: "Any other relevant information"
    validations:
      required: false
