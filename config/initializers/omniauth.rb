Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['FACEBOOK_KEY'], ENV['FACEBOOK_SECRET'], {
    include_granted_scopes: true,
    callback_path: '/auth/facebook/callback'
  }
end
# Configuration is only loaded at boot, must restart rails server after changing any config files
