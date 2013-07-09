module Utilities
	def self.nested_hash_value(obj,key)
	  if obj.respond_to?(:key?) && obj.key?(key)
	    obj[key]
	  elsif obj.respond_to?(:each)
	    r = nil
	    obj.find { |*a| r = nested_hash_value(a.last,key) }
	   	r
	  end
	end
end

class FuzzySearchIndexer
	INDEXED = { "Lesson" => [:title], "Question" => [:title] }

	def self.index_models
		INDEXED.each do |model, attribs|
			attribs.each do |attrib|
				model.constantize.all.each do |instance|
					text = instance.send(attrib)
					index_words(text, model, instance.id)
				end
			end
		end
	end

	def self.index_attributes(instance)
		indexed_attribs = INDEXED[instance.class.to_s]
		indexed_attribs.each do |attrib|
			text = instance.send(attrib)
			self.index_words(text, instance, instance.id)
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