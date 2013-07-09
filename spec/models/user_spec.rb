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
    it { should allow_mass_assignment_of(:oauth_token) }
  end

  context 'testing validations' do
    it { should validate_presence_of(:oauth_token) }
    it { should validate_presence_of(:uid) }
    it { should validate_presence_of(:name) }
  end


  describe '::from_omniauth' do
    before(:each) do
      @auth = OmniAuth.config.mock_auth[:facebook]
      @user = FactoryGirl.create(:user) 
    end
    it 'it finds or creates a new user' do
      expect(User.from_omniauth(@auth)).to eq(@user)
    end
  end

end
