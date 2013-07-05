require 'spec_helper'

describe User do
  context 'testing associations' do
    it { should have_many :user_lessons }
    it { should have_many :user_lessons }
    it { should have_many(:lessons).through(:user_lessons) }
    it { should have_many(:created_lessons).class_name('Lesson') }
  end


  context 'testing attr_accessible' do
    it { should allow_mass_assignment_of(:email) }
    it { should allow_mass_assignment_of(:first_name) }
    it { should allow_mass_assignment_of(:last_name) }
  end

  context 'testing validations' do
    it { should validate_presence_of(:first_name) }
    it { should validate_presence_of(:last_name) }
    it { should_not allow_value('bad@email').for(:email) }
    it { should allow_value('good@email.com').for(:email) }
  end
end
