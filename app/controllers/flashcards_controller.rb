class FlashcardsController < ApplicationController
  def index
    @flashcards = Content.find(params[:content_id]).flashcards
    render partial: 'flashcards/data'
  end

  def create
    flashcard = Flashcard.create(params[:flashcard])
    render text: flashcard.content.flashcards.count, status: 200
  end
end
