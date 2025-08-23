User.destroy_all
Murmur.destroy_all
Follow.destroy_all
Like.destroy_all


u1 = User.create!(name: 'Alice', username: 'alice', bio: 'Hello world')
u2 = User.create!(name: 'Bob', username: 'bob', bio: 'Rails + TS!')
u3 = User.create!(name: 'Cara', username: 'cara', bio: 'I like cats')


Follow.create!(follower: u1, followed: u2)
Follow.create!(follower: u1, followed: u3)


10.times { |i| u2.murmurs.create!(content: "From Bob ##{i}") }
8.times { |i| u3.murmurs.create!(content: "From Cara ##{i}") }
5.times { |i| u1.murmurs.create!(content: "From Alice ##{i}") }


Like.create!(user: u1, murmur: Murmur.first)
puts "Seeded: Users=#{User.count}, Murmurs=#{Murmur.count}"
