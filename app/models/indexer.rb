# why is this in the models directory, it should be a lib
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
			text.split(' ').each do |word|
				Search.create(
					term: word,
					searchable_type: searchable_type,
					searchable_id: searchable_id )
			end
		end
	end
end