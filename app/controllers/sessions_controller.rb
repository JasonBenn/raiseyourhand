class SessionsController < ApplicationController
  def create
  	p env["omniauth.auth"]
    @user = User.from_omniauth(env["omniauth.auth"])
    session[:user_id] = @user.id
    redirect_to root_path
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url
  end
end