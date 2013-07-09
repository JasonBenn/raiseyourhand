require 'spec_helper'

OmniAuth.config.mock_auth[:facebook] = OmniAuth::AuthHash.new( {
    :info => {
      :name => 'Mario Brothers',
      :image => '',
      :email => 'dpsk@email.ru' },
    :uid => '12345',
    :provider => 'facebook',
    :credentials => {:token => 'token', :expires_at => 1378566562}
  })

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
  
    end


    it 'should return an exiting user' do
      user = FactoryGirl.create(:user) 
      expect(User.from_omniauth(@auth)).to eq(user)
    end

    it "should create a user if it doesn't already exist" do
      expect{User.from_omniauth(@auth)}.to change{User.count}.by(1)
    end
  end

end
