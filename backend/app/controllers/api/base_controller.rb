module Api
  class BaseController < ApplicationController
    before_action :set_current_user

    private

    def set_current_user
      uid = request.headers['X-User-Id'] || params[:current_user_id]
      @current_user = User.find_by(id: uid) || User.first
    end

    def paginate(scope)
      page  = params[:page].to_i
      page  = 1 if page < 1
      per   = 10
      total = scope.count
      items = scope.limit(per).offset((page - 1) * per)
      [items, { page: page, per_page: per, total: total, total_pages: (total.to_f / per).ceil }]
    end

    def render_collection(scope, include_user: true)
      items, meta = paginate(scope)

      murmur_ids = items.map(&:id)
      liked_ids  = @current_user ? Like.where(user_id: @current_user.id, murmur_id: murmur_ids).pluck(:murmur_id) : []
      liked_set  = liked_ids.to_set

      data = items.map do |m|
        row = {
          id: m.id,
          content: m.content,
          likes_count: m.likes_count,
          created_at: m.created_at,
          liked_by_me: liked_set.include?(m.id)
        }
        if include_user
          u = m.user
          row[:user] = { id: u.id, name: u.name, username: u.username }
        end
        row
      end

      render json: { data: data, meta: meta }
    end
  end
end