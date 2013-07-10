if Rails.env.development?
	FACEBOOK_CONFIG = YAML.load_file("#{::Rails.root}/config/facebook.yml")[::Rails.env]

	OmniAuth.config.logger = Rails.logger

	Rails.application.config.middleware.use OmniAuth::Builder do
  	provider 	:facebook, FACEBOOK_CONFIG['app_id'], FACEBOOK_CONFIG['secret'],
           		:scope => 'email', :display => 'popup'
 		end
end



if Rails.env.production?
  Rails.application.config.middleware.use OmniAuth::Builder do
  		provider 	:facebook, ENV['APP_ID'], ENV['SECRET'],
           			:scope => 'email', :display => 'popup'
 	end
end


if Rails.env.test?
	FACEBOOK_CONFIG = YAML.load_file("#{::Rails.root}/config/facebook.yml")[::Rails.env]

	OmniAuth.config.logger = Rails.logger

	Rails.application.config.middleware.use OmniAuth::Builder do
  	provider 	:facebook, FACEBOOK_CONFIG['app_id'], FACEBOOK_CONFIG['secret'],
           		:scope => 'email', :display => 'popup'
 		end
end


