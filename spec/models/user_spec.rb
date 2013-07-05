require 'spec_helper'

describe User do
  context 'testing associations' do
    it { should have_many :user_lessons }
    it { should have_many :user_lessons }
    it { should have_many(:lessons).through(:user_lessons) }
    it { should have_many(:created_lessons).class_name('Lesson') }
  end

  
  # attr_accessible :email, :first_name, :last_name
end
