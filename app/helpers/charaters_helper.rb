module CharatersHelper
    def render_stars(value)
        output = ''
        if (1..5).include?(value.to_i)
          value.to_i.times { output += '*'}
        end
        output
      end

    def render_roles(value)
        if value.present?
            case value
            when 1
                'Main DSP'
            when 2
                'Support DSP'
            when 3
                'Support'
            end
        end
    end
end
