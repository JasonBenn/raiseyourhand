class QuestionsController < ApplicationController
  def create
    render json: Question.create(params[:question])
  end
end
