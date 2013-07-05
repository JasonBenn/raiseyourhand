module ApplicationHelper
	def link_to_add_fields(name, form_builder, association)  
		object = form_builder.object.class.reflect_on_association(association).klass.new
    partial = "#{association.to_s.singularize}_fields"
    template = content_tag(:div, :id => "#{association}_fields_template", :style => "display: none") do
      form_builder.fields_for(association, object, :child_index => "new_#{association}") do |f|
        render(:partial => partial, :locals => { :f => f })
      end
    end
    template + link_to(name, "javascript:void(0)", :class => "add_child", :"data-association" => association)
	end
end
