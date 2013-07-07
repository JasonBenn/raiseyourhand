class FlashcardsController < ApplicationController
  def index
    @flashcards = Content.find(params[:content_id]).flashcards
    render partial: 'flashcards/data'
  end
end
