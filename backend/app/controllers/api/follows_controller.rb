module Api
  class FollowsController < BaseController
    def create
      user = User.find(params[:id])
      f = Follow.find_or_create_by!(follower: @current_user, followed: user)
      render json: { ok: true }
    end

    def destroy
      user = User.find(params[:id])
      Follow.where(follower: @current_user, followed: user).delete_all
      render json: { ok: true }
    end
  end
end
