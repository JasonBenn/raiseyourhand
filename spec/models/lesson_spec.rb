require 'spec_helper'

describe Lesson do
  context 'testing associations' do
    it { should have_many :user_lessons }
    it { should have_many(:users).through(:user_lessons) }
    it { should belong_to(:creator).class_name("User") }
  end

  context 'testing attr_accessible' do
    it { should allow_mass_assignment_of(:creator_id) }
  end

  pending 'testing validations'

end
