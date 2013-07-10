module Indexer
	INDEXED = { "Lesson" => [:title], "Question" => [:title] }

	def self.index_models
		INDEXED.each do |model, attribs|
			attribs.each do |attrib|
				model.constantize.all.each do |instance|
					text = instance.send(attrib)
					self.index_words(text, model, instance.id)
				end
			end
		end
	end

	def index_attributes
		indexed_attribs = INDEXED[self.class.to_s]
		indexed_attribs.each do |attrib|
			text = self.send(attrib)
			Indexer.index_words(text, self.class.name, self.id)
		end
	end

	def self.index_words(text, searchable_type, searchable_id)
		unless text.nil?
			indexable_word_sequences(text, 3).each do |word|
				Search.create(
					term: word,
					searchable_type: searchable_type,
					searchable_id: searchable_id )
			end
		end
	end

	private 

	def self.indexable_word_sequences(text, max_words_per_sequence)
		words = text.split(' ').map(&:downcase)
		(1..max_words_per_sequence).map do |num_words|
			words.each_cons(num_words).map { |a| a.join(' ') }
		end.flatten
	end
end