from rest_framework import serializers

class QuestionGeneratorSerializer(serializers.Serializer):
    job = serializers.CharField(required=True)
    experience = serializers.CharField(required=True)

    def validate_experience(self, value):
        valid_experiences = ['basic', 'intermediate', 'expert']
        if value.lower() not in valid_experiences:
            raise serializers.ValidationError(
                f"Experience must be one of: {', '.join(valid_experiences)}"
            )
        return value.lower()
