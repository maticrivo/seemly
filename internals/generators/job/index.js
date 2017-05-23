module.exports = {
  description: 'Add a new job',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Job',
    validate: (value) => {
      if (!(/.+/).test(value)) {
        return 'The name is required'
      }

      return true
    }
  }, {
    type: 'input',
    name: 'time',
    message: 'When should it run?',
    default: '* * * * *'
  }, {
    type: 'input',
    name: 'timezone',
    message: 'Should run in a specific time zone?'
  }, {
    type: 'confirm',
    name: 'complete',
    message: 'Run code after tick finished execution?'
  }, {
    type: 'confirm',
    name: 'runOnInit',
    message: 'Run onTick right after cron initialized?'
  }],
  actions: () => {
    const jobTemplate = './job/_template.hbs'

    const actions = [{
      type: 'add',
      path: '../../jobs/{{ dashCase name }}.js',
      templateFile: jobTemplate,
      abortOnFail: true
    }]

    return actions
  }
}
