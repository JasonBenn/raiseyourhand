require 'faker'

def random_time_in(parent)
  random_time = rand(parent.length)
  (parent.start_time.to_f + random_time).to_s
end

15.times do
  lesson = Lesson.create
  lesson.contents.create(
    url: 'http://www.youtube.com/watch?v=sfw5ZPowLJY',
    position: 0,
    start_time: '22',
    finish_time: '462'
    )
  lesson.contents.create(
    url: 'http://www.youtube.com/watch?v=dtrWHL9Asec',
    position: 1,
    start_time: '0',
    finish_time: '202'
    )
  lesson.contents.create(
    url: 'http://www.youtube.com/watch?v=IyCnbyWZkRU',
    position: 2,
    start_time: '0',
    finish_time: '1225'
    )

  Lesson.create.contents.create(
    url: 'http://www.youtube.com/watch?v=iCEwJh47lcA',
    position: 0,
    start_time: '650',
    finish_time: '4493'
    )
end

Content.all.each do |content|
  three_minute_intervals = (content.length/180).ceil
  three_minute_intervals.times do
    Question.create(
    content_id: content.id,
    time_in_content: random_time_in(content),
    title: Faker::Lorem.sentence(rand(3..5)).gsub('.', '?'),
    text: Faker::Lorem.sentence(rand(15..100)).gsub('.', '?')
    )
  end

  two_minute_intervals = (content.length/120).ceil
  two_minute_intervals.times do
    Flashcard.create(
      content_id: content.id,
      front: Faker::Lorem.sentence(rand(8..75)),
      back: Faker::Lorem.sentence(rand(15..75))
      )
  end
end

count = Question.all.size
count.times do
  rand(0..3).times do
    Answer.create(
      question_id: rand(1..count),
      text: Faker::Lorem.sentence(rand(15..150))
      )
  end
end
