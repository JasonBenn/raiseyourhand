class SessionsController < ApplicationController
  def create
  	p env["omniauth.auth"] # random leftover debugging code like this should not be in master branch

    # why is @user an instance variable?
    @user = User.from_omniauth(env["omniauth.auth"])
    session[:user_id] = @user.id
    redirect_to root_path
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url
  end
end