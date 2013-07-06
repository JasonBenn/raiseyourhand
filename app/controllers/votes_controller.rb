class VotesController < ApplicationController
  def create
    if current_user
      vote = Vote.create(
        votable_id: params[:votable_id],
        votable_type: params[:votable_type],
        direction: params[:direction], 
        user_id: current_user.id)

      votes_count = vote.votable.votes_count
      render json: { votes_count: votes_count }
    end
  end
end
