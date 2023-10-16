module GiAccountsHelper
    def render_list_char(list_char)
        list_char = list_char.tr('[]', '').split(',').map(&:strip)
        character_info = list_char.map do |info|
          character_id, constellation = info.split('_')
          character_name = Charater.find(character_id).name
          if constellation.present?
            "#{character_name} C#{constellation}"
          else
            character_name
          end
        end
        character_info.join(", ")
      end
      

      def render_list_weap(list_weap)
        list_weap = list_weap.tr('[]', '').split(',').map(&:strip)
        weapon_info = list_weap.map do |info|
          weapon_id, refinement = info.split('_')
          weapon_name = Weapon.find(weapon_id).name
          if refinement.present?
            "#{weapon_name} R#{refinement}"
          else
            weapon_name
          end
        end
        weapon_info.join(", ")
      end
      
      
end
