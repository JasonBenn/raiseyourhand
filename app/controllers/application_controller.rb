class ApplicationController < ActionController::Base
  protect_from_forgery

  helper_method :current_user, :is_logged_in?

  private

  def current_user
    @current_user ||= User.find_by_id(session[:user_id])
  end

  def is_logged_in?
  	!current_user.nil?
  end

  # i'd prefer this method be present tense (not past tense)
  def authenticate
  	redirect_to root_url unless is_logged_in?
  end

  def bad_request
    render text: "Invalid Request", status: "400"
    return false
  end
end
