module.exports = {
  description: 'Add a new dashboard',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Dashing',
    validate: (value) => {
      if (!(/.+/).test(value)) {
        return 'The name is required'
      }

      return true
    }
  }],
  actions: () => {
    const dashboardTemplate = './dashboard/_template.hbs'

    const actions = [{
      type: 'add',
      path: '../../pages/{{dashCase name}}.js',
      templateFile: dashboardTemplate,
      abortOnFail: true
    }]

    return actions
  }
}
