module.exports = {
  staffTypes: ['officer', 'personnel', 'civil'],
  engagementTypes: ['candidate', 'trainee'],

  gaIdentifiers: {
    trainingInstituteId: 'GA_TRAINING_INSTITUTE'
  },

  allowedSystems: {
    person: ['HRMS'],
    staffRole: ['HRMS'],
    engagementRole: {
      candidate: ['EXAMS_APP'],
      trainee: ['GA_TRAINING_APP']
    }
  }
};