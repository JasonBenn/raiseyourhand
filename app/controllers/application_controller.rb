class ApplicationController < ActionController::Base
  protect_from_forgery


  private
  def current_user
    @current_user ||= User.find_by_id(session[:user_id])
  end
  helper_method :current_user

  def is_logged_in?
  	!current_user.nil?
  end

  helper_method :is_logged_in?

  def authenticated
  	redirect_to root_url unless is_logged_in?
  end

  def bad_request
    render text: "Invalid Request", status: "400"
    return false
  end
end
