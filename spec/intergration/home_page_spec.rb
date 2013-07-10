require 'spec_helper'

describe 'home page' do
	it 'renders the page', js: true do
		visit '/'
		expect(page).to have_content('Raise Your Hand')
	end
end
