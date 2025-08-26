module Api
  class LikesController < BaseController
    def create
      m = Murmur.find(params[:id])
      Like.find_or_create_by!(user: @current_user, murmur: m)
      render json: { ok: true, likes_count: m.reload.likes_count }
    end

    def destroy
      m = Murmur.find(params[:id])
      Like.where(user: @current_user, murmur: m).destroy_all
      render json: { ok: true, likes_count: m.reload.likes_count }
    end
  end
end
