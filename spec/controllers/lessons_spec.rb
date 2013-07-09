require 'spec_helper'


describe LessonsController do
	describe '#create' do
		it 'a lesson when signed in' do
			post(:create, title: "Oh Yeah", 
										contents_attributes:
										{0 =>{position: "0", 
													start_time: "0", 
													url: "http://www.youtube.com/watch?v=NkVsJGl5d6E"})
		end

		it 'should create the first piece of content'

	end
end

